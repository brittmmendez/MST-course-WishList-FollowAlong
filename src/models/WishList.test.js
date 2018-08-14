import { getSnapshot, onSnapshot, onPatch} from "mobx-state-tree"
import { reaction } from "mobx"
import { WishListItem, WishList } from "./WishList"

// WISHILIST ITEM
const item = WishListItem.create({
    "name" : "Chron of Narnia Box Set",
    "price": 28.75,
    "image": "https://www.google.com/search?q=flower+pictures&rlz=1C5CHFA_enUS804US804&tbm=isch&source=iu&ictx=1&fir=yd62M53yvhtdBM%253A%252C5UbOpOqf9qM23M%252C_&usg=AFrqEzc3xs2BwNc35psQ7ZIL4FGZeXx0LQ&sa=X&ved=2ahUKEwi3i6HGjODcAhWo6IMKHe9xBjIQ9QEwAHoECAQQBA#imgrc=yd62M53yvhtdBM:"
})

it("can create an instance of a WishListItem model with correct name", () =>{
    expect(item.name).toBe("Chron of Narnia Box Set")   
})

it("can create an instance of a WishListItem model with correct price", () =>{
    expect(item.price).toBe(28.75)
})

it("can create an instance of a  model with correct image", () =>{
    expect(item.image).toBe("https://www.google.com/search?q=flower+pictures&rlz=1C5CHFA_enUS804US804&tbm=isch&source=iu&ictx=1&fir=yd62M53yvhtdBM%253A%252C5UbOpOqf9qM23M%252C_&usg=AFrqEzc3xs2BwNc35psQ7ZIL4FGZeXx0LQ&sa=X&ved=2ahUKEwi3i6HGjODcAhWo6IMKHe9xBjIQ9QEwAHoECAQQBA#imgrc=yd62M53yvhtdBM:")
})

it("can change the name of an item instance", () =>{
    item.changeName("This is my new name!")
    expect(item.name).toBe("This is my new name!")
})

it("can change the price of an item instance", () =>{
    item.changePrice(22.22)
    expect(item.price).toBe(22.22)
})


// WISHILIST
it("can create a WishList with items", () =>{
    const wishList = WishList.create({
        items: [
            {
                name : "Chron of Narnia Box Set",
                price: 28.75,
                image: "https://www.google.com/search?q=flower+pictures&rlz=1C5CHFA_enUS804US804&tbm=isch&source=iu&ictx=1&fir=yd62M53yvhtdBM%253A%252C5UbOpOqf9qM23M%252C_&usg=AFrqEzc3xs2BwNc35psQ7ZIL4FGZeXx0LQ&sa=X&ved=2ahUKEwi3i6HGjODcAhWo6IMKHe9xBjIQ9QEwAHoECAQQBA#imgrc=yd62M53yvhtdBM:"
            }
        ]
    })
    expect(wishList.items.length).toBe(1)
    expect(wishList.items[0].price).toBe(28.75)
})

it("can create a WishList without any items", () =>{
    const list = WishList.create()
    expect(list.items.length).toBe(0)
})

it("can add an item to a WishList", () =>{
    const emptywishList = WishList.create()
    const states = []
    onSnapshot(emptywishList, snapshot => {
        states.push(snapshot)
    })

    emptywishList.addItem({
            name : "Twilight Box Set",
            price: 28.75
        })
    expect(emptywishList.items.length).toBe(1)
    expect(emptywishList.items[0].price).toBe(28.75)
    
    emptywishList.items[0].changeName("It's Changed!")
    expect(emptywishList.items[0].name).toBe("It's Changed!")

    expect(getSnapshot(emptywishList)).toEqual({
        items: [
            {
                name: "It's Changed!",
                price: 28.75,
                image: ""
            }
        ]
    })

    expect(getSnapshot(emptywishList)).toMatchSnapshot()

    expect(states).toMatchSnapshot()
})

it("can add an item to a WishList -2", () =>{
    const emptywishList = WishList.create()
    const patches = []
    onPatch(emptywishList, patch => {
        patches.push(patch)
    })

    emptywishList.addItem({
            name : "Twilight Box Set",
            price: 28.75
        })
    
    emptywishList.items[0].changeName("It's Changed!")

    expect(patches).toMatchSnapshot()
})


it("can calculate the total price of a wishlist", () =>{
    const list = WishList.create()
    list.addItem({name : "item 1", price: 2})
    list.addItem({name : "item 2", price: 4})
    list.addItem({name : "item 3", price: 5})

    expect(list.totalPrice).toBe(11)

    let changed = 0 
    reaction(() => list.totalPrice, () => changed++)
    expect(changed).toBe(0)
    console.log("total Price" + list.totalPrice)
    console.log("changed:"+ changed)
    list.items[0].changeName("New Item 1")
    expect(changed).toBe(0)
    console.log("total Price" + list.totalPrice)
    console.log("changed:"+ changed)
    list.addItem({name : "item 4", price: 6})
    expect(changed).toBe(1)
    console.log("total Price" + list.totalPrice)
    console.log("changed:"+ changed)

})