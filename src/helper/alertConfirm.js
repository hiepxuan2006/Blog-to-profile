import Swal from "sweetalert2"

export const confirmDialog = async (data) => {
  let kq
  await Swal.fire({
    title: "Bạn chắc chăn?",
    text: "Vui lòng xác nhận!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Đồng ý!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        kq = true
      } catch (error) {
        kq = false
      }
    } else {
      kq = false
    }
  })
  return kq
}
