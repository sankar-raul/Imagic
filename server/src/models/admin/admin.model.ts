import { model } from "mongoose";
import { IAdmin } from "../../Types/interface/admin.interface";
import adminSchema from "./admin.schema";

const AdminModel = model<IAdmin>("admins", adminSchema);

export default AdminModel;
