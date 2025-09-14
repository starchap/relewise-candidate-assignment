import { IUser } from "@typings/userTypings";
import { Request, Response, Router  } from "express";
import {isEmpty} from "lodash";
import {productStorage} from "../storage/products";

const router = Router();

type TrackProductViewRequest = Request<{}, {}, {
    user: IUser;
    productId: string;
}>;

router.post("/", (
    req: TrackProductViewRequest,
    res: Response) => {
    const body = req.body;
    if (isEmpty(body.productId)) {
        res.sendStatus(400);
    }
    if (productStorage.registerUserView(body.user, body.productId)) {
        res.sendStatus(200);
    }
});

export default router;
