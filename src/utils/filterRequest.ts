import {SortDirection, Collection, ObjectId} from "mongodb";
import { transformPostId } from "./helper";

interface FilterRequestParams {
    searchNameTerm?: string | null;
    sortBy: string;
    sortDirection: string;
    pageNumber: number;
    pageSize: number;
    field?:string | undefined;
    isFindPostsByBlog?:boolean | undefined;
}

export const filterRequest = async (
    params: FilterRequestParams,
    repo: any
) => {
    const { searchNameTerm, sortBy, sortDirection, pageNumber, pageSize, field, isFindPostsByBlog } = params;

    try {
        let filter: any = {};

        if(isFindPostsByBlog && field) {
            filter[field] = searchNameTerm;
        } else {
            filter = searchNameTerm && field ? { [field]: { $regex: searchNameTerm, $options: 'i' } } : {};
        }

        const sortCriteria: [string, SortDirection][] = [[sortBy, sortDirection as SortDirection]];

        const skip = (pageNumber - 1) * pageSize;
        const limit = pageSize;

        const totalCount = await repo.countDocuments(filter);

        const elements = await repo
            .find(filter)
            .sort(sortCriteria)
            .skip(skip)
            .limit(limit)
            .toArray();

        const pagesCount = Math.ceil(totalCount / pageSize);

        const mapElements = elements.map(transformPostId);
        return {
            pagesCount,
            page: pageNumber,
            pageSize,
            totalCount,
            items: mapElements,
        };
    } catch (e) {
        console.error('Error fetching elements:', e);
        return {
            pagesCount: 0,
            page: pageNumber,
            pageSize,
            totalCount: 0,
            items: [],
        };
    }
};
