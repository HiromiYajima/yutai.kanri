const yutaiDOM = document.querySelector(".tasks");
const formDOM = document.querySelector(".task-form");
const yutaiInputDOM = document.querySelector(".task-input");
const yutaiExpiredDOM = document.querySelector(".task-expired");
const formAlertDOM = document.querySelector(".form-alert");

// 表示
const showYutai = async () => {
    try {
        const { data: yutai } = await axios.get("/api/v1/yutai");

        if (yutai.length < 1) {
            yutaiDOM.innerHTML = `<h5 class="empty-list">優待銘柄がありません</h5>`;
            return;
        }
        const allYutai = yutai.map((yutai) => {
        const { used, _id, name, expireD } = yutai;

        // Date型に変換
        const date = new Date(expireD);

        // 日本語形式の日付にフォーマット
        const expireYmd = new Intl.DateTimeFormat('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(date);
        
            return `<div class="single-task ${used && "task-completed"}">
                        <h5><span><i class="far fa-check-circle"></i></span>${name}　　${expireYmd}</h5>
                        <div class="task-links">
                            <a href="edit.html?id=${_id}" class="edit-link">
                                <i class="fas fa-edit"></i>
                            </a>
                            <button type="btn" class="delete-btn" data-id="${_id}">
                                <i class="fas fa-trash"></i>
                            </button>    
                        </div>
                    </div>`;
        }).join("");
        yutaiDOM.innerHTML = allYutai;
    } catch (err) {
        formAlertDOM.innerHTML = "無効です。もう一度やり直してください。";
    }
};
showYutai();

// 登録
formDOM.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = yutaiInputDOM.value;
    const expireD = yutaiExpiredDOM.value;
    const date = new Date(expireD);
    const formattedDate = date.toISOString().split('T')[0];

    try {
        await axios.post("/api/v1/yutai", {name: name, expireD: formattedDate});
        showYutai();
        yutaiInputDOM.value = "";
        yutaiExpiredDOM.value = "";
        formAlertDOM.style.display = "block";
        formAlertDOM.textContent = "優待銘柄を追加しました";
        formAlertDOM.classList.add("text-success");
    } catch (err) {
        formAlertDOM.style.display = "block";
        formAlertDOM.innerHTML = "無効です。もう一度やり直してください。";
    }
    setTimeout(() => {
        formAlertDOM.style.display = "none";
        formAlertDOM.classList.remove("text-success");
    }, 3000);
});

// 削除
yutaiDOM.addEventListener("click", async (event) => {
    const element = event.target;
    if (element.parentElement.classList.contains("delete-btn")) {
        const id = element.parentElement.dataset.id;
        try {
            await axios.delete(`/api/v1/yutai/${id}`);
            showYutai();
        } catch(err) {
            console.log(err);
        }
    }
});