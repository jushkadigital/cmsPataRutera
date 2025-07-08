import { checkRole } from "@/collections/Users/access";
import { Access } from "payload";

export const isAdminOrCreatedBy: Access = ({ req: { user } }) => {
    // Scenario #1 - Check if user has the 'admin' role


    // Scenario #2 - Allow only documents with the current user set to the 'createdBy' field
    if (user) {
        if (checkRole(['admin'], user)) {
            return true;
        } else {
            return {
                createdBy: {
                    equals: user.id,
                },
            };
        }
        // Will return access for only documents that were created by the current user

    }

    // Scenario #3 - Disallow all others
    return false;
};