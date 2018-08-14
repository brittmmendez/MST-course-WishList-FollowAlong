import React from "react"
import { observer } from "mobx-react"

import WishListItemView from "./WishListItemView"
import WishListItemEntry from "./WishListItemEntry"

const WishListView = ({ wishList, readonly }) => (
    <div className="list">
        {!readonly && <WishListItemEntry wishList={wishList} />}
        <ul>
            {wishList.items.map((item, idx) => (
                <WishListItemView key={idx} item={item} readonly={readonly} />
            ))}
        </ul>
        {!readonly && (<h1> {wishList.totalPrice > 60 ? "You're spending alot of money!" : null} </h1>)}
        {!readonly && (<span>
            <p>
                Subtotal: ${wishList.subTotalPrice} + Taxes: ${wishList.taxes}{" "}
            </p>
        </span> )}
        {!readonly && (<h1> Total: ${wishList.totalPrice} </h1>)}
    </div>
)

export default observer(WishListView)
