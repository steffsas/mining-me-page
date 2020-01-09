import { storageFactory } from "storage-factory";

// user storage-factory instead of local storage -> security
export const local = storageFactory(() => localStorage);
export const session = storageFactory(() => sessionStorage);
