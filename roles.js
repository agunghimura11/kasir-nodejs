// server/roles.js
import AccessControl from "accesscontrol";

// This is actually how the grants are maintained internally.
let grantsObject = {
    kasir: {
        video: {
            'create:any': ['*', '!views'],
            'read:any': ['*'],
            'update:any': ['*', '!views'],
            'delete:any': ['*']
        }
    },
    user: {
        video: {
            'create:own': ['*', '!rating', '!views'],
            'read:own': ['*'],
            'update:own': ['*', '!rating', '!views'],
            'delete:own': ['*']
        }
    },
    admin: {
        video: {
            'create:own': ['*', '!rating', '!views'],
            'read:own': ['*'],
            'update:own': ['*', '!rating', '!views'],
            'delete:own': ['*']
        }
    }
};
const ac = new AccessControl(grantsObject);

export default ac