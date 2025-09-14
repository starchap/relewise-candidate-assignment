import { IProduct } from "@typings/productTypings";
import { IUser } from "@typings/userTypings";
import { Request, Response, Router } from "express";
import { isEmpty } from "lodash";
import { productStorage } from "../storage/products";

const router = Router();

interface ISearchInput { term: string; languageCode: string; }

type SearchRequest = Request<{}, {}, {
    user: IUser;
    search: ISearchInput;
}>;

type SearchResponse = Response<{
    products: IProduct[];
}>;

router.post("/", (req: SearchRequest, res: SearchResponse) => {
    const body = req.body;
    if (isEmpty(body.search.term) || isEmpty(body.search.languageCode)) {
        res.sendStatus(400);
    }
    res.send(productStorage.searchProductsFromStorage(body.search.term));
});

export default router;
