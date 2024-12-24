"use server"

// ........................Place order
async function CreateOrder(tokin: string, bookId: number, clientName: string ) {
  const res = await fetch("https://simple-books-api.glitch.me/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${tokin}`,
    },
    body: JSON.stringify({
      "bookId": bookId,
      "customerName": clientName
    }),
  });

  if(res.status !== 201) {
    return ("Failed to place order. Try again.");
}
  const data = await res.json()
  return data
}
export default CreateOrder


// ................................Get orders 

export async function getOrders(tokin: any) {
  const response= await fetch("https://simple-books-api.glitch.me/orders",{
    method: "GET",
    headers: {
      "Authorization": `Bearer ${tokin}`
    }
   })
 if (response.ok === false){
return ("Fieled to get orders")
 }
 const data = await response.json()
return data;
 } 


 // ................................Delete order

 export async function deleteOrder(orderId: any, tokin: any) {
  const response= await fetch(`https://simple-books-api.glitch.me/orders/${orderId}`,{
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${tokin}`
    }
   })
 if (response.ok === false){
return ("Failed to delete order")
 }else{
  return ("Order deleted successfully")
 }
 }




