import { Milestone } from "./milestone";
import { UserPermission } from "../security/user-permission";

export class Project {
    id: number;
    name: string;
    milestones: Milestone[];
    userPermissions: UserPermission[];
}