import { ref } from "vue";

export interface ResourceState {
  isLoading: boolean;
  isError: boolean;
}

function createResourceState(
  isLoading: boolean,
  isError: boolean
): ResourceState {
  return {
    isLoading,
    isError,
  };
}

function updateResourceStateByPromise<T>(
  promise: Promise<T>,
  updater: (state: ResourceState) => void // eslint-disable-line
) {
  updater(createResourceState(true, false));
  promise
    .then((val) => {
      updater(createResourceState(false, false));
      return val;
    })
    .catch(() => {
      updater(createResourceState(false, true));
    });
}

export function useResourceState<T>(loader: () => Promise<T>) {
  const resource = ref<T>();
  const state = ref<ResourceState>(createResourceState(true, false));
  const load = () =>
    updateResourceStateByPromise(
      loader().then((newResource) => {
        resource.value = newResource;
      }),
      (newState) => {
        state.value = newState;
      }
    );
  return {
    resource,
    state,
    load,
  };
}
