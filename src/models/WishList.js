import { types, getParent, destroy } from "mobx-state-tree"

export const WishListItem = types
    .model({
        name: types.string,
        price: types.number,
        image: ""
    })
    .actions(self => ({
        changeName(newName) {
            self.name = newName
        },
        changePrice(newPrice) {
            self.price = newPrice
        },
        changeImage(newImage) {
            self.image = newImage
        },
        remove() {
            getParent(self, 2).remove(self)
        }
    }))

export const WishList = types
    .model({
        items: types.optional(types.array(WishListItem), [])
    })
    .actions(self => ({
        add(item) {
            self.items.push(item)
        },
        remove(item) {
            destroy(item)
        }
    }))
    .views(self => ({
        get subTotalPrice() {
            return self.items.reduce((sum, entry) => sum + entry.price, 0)
        },

        get taxes() {
            return parseFloat(self.subTotalPrice * 0.07).toFixed(2)
        },
        get totalPrice() {
            return self.items.reduce((sum, entry) => sum + entry.price, 0)
        }
    }))
