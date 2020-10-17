// server/roles.js
import AccessControl from "accesscontrol";

// This is actually how the grants are maintained internally.
let grantsObject = {
    bos: {
        Transaksi: {
            'create:any': ['*', '!views'],
            'read:any': ['*'],
            'update:any': ['*', '!views'],
            'delete:any': ['*']
        }
    },
    manager: {
        Transaksi: {
            'create:own': ['*', '!rating', '!views'],
            'read:any': ['*'],
            'update:own': ['*', '!rating', '!views'],
            'delete:own': ['*']
        }
    },
    kasir: {
        Transaksi: {
            'create:own': ['*', '!rating', '!views'],
            'read:own': ['*'],
            'update:own': ['*', '!rating', '!views'],
            'delete:own': ['*']
        }
    }
};
const ac = new AccessControl(grantsObject);

export default ac