var userData = JSON.parse(localStorage.getItem('currentUser'));

// Display user info
if (userData) {
    document.getElementById("user-info").innerHTML = `
                <p>${userData.name}</p>
            `;
} else {
    document.getElementById("user-info").innerHTML = "<p>Không có thông tin người dùng.</p>";
}
function Logout(){
    const confirmation = confirm("Bạn có muốn đăng xuất không?");

    if (!confirmation) {
        console.log("Hủy đăng xuất");
        return; // Không thực hiện xóa nếu người dùng hủy bỏ
    }
    window.location.href="login.html"
}