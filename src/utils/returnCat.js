export const returnCat = (id) => {
    const cats = [
    'https://cdn.shopify.com/s/files/1/1832/0821/files/catshark.jpg?v=1649869148',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlNyI5Bbsl1vq1BQjH9XA-Z4j0Kkk0cEpAnA&usqp=CAU',
    'https://i.pinimg.com/474x/d7/ca/3e/d7ca3eef04679859b2986d94f0ee17fc--call-center-current-events.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8QuFrfC9K8jNbQBDfGXabz2kukhp2RFCByQ&usqp=CAU',
    'https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d',
    'https://i.guim.co.uk/img/media/c5e73ed8e8325d7e79babf8f1ebbd9adc0d95409/2_5_1754_1053/master/1754.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=b6ba011b74a9f7a5c8322fe75478d9df',
]
    return cats[id%6]
}