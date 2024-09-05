import {PostTypes} from "../db/post-types";


export const transformPostId = (post: any): any => {
    const { _id, ...rest } = post;
    return { id: _id?.toString(), ...rest };
};
