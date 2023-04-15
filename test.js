let a = [
  [],
  [
    {
      idPlayer: "Ox-p63V9nf7Zu69CAAAo",
      userId: "64386463914e6eab6cbaebbd",
      userName: "imhx",
      player: true,
    },
    {
      idPlayer: "Ox-p63V9nf7Zu69CAAAD",
      userId: "64386463914e6eab6cbaebba",
      userName: "imhx",
      player: false,
    },
    {
      idPlayer: "Ox-p63V9nf7Zu69CAAA4",
      userId: "64386463914e6eab6cbaebbs",
      userName: "imhx",
      player: false,
    },
    // {
    //   idPlayer: "Ox-p63V9nf7Zu69CAAAD",
    //   userId: "64386463914e6eab6cbaebbf",
    //   userName: "imhx",
    //   player: false,
    // },
  ],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
]
const idRoomNumber = 1
const value = {
  idPlayer: "Ox-p63V9nf7Zu69CAAAD",
  userId: "64386463914e6eab6cbaebbd",
  userName: "imhx",
  player: true,
  idRoomNumber: idRoomNumber,
}

const deleteMember = (idPlayer) => {
  let room
  a.forEach((element) => {
    element.forEach((item, index) => {
      if (item.idPlayer === idPlayer) {
        console.log(index)
        room = index
      }
    })
  })
  const dataRoomNew = a[room].filter((member) => member.idPlayer !== idPlayer)
  a[room] = dataRoomNew
  return room
}
const sortRoom = (idRoomNumber) => {
  const player = a[idRoomNumber].filter((member) => member.player === true)
  if (player.length < 2) {
    const viewers = a[idRoomNumber]
      .filter((member) => member.player === false)
      .map((item, index) => {
        switch (player.length) {
          case 0:
            if (index === 0 || index === 1) {
              item.player = true
            }
          // eslint-disable-next-line no-fallthrough
          case 1:
            if (index === 0) {
              item.player = true
            }
            break
          default:
            break
        }
        return item
      })
    a[idRoomNumber] = [...player, ...viewers]
  }
}

const b = deleteMember(value.idPlayer)
console.log("======", b)
sortRoom(b)
console.log(a)
