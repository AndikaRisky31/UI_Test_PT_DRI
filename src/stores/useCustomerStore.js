import {create} from 'zustand';

const useCustomerStore = create((set) => ({
  selectedCustomerId: null,
  setSelectedCustomerId: (id) => set({ selectedCustomerId: id }),
}));

export default useCustomerStore;
