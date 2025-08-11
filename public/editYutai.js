const params = window.location.search;
const id = new URLSearchParams(params).get("id");
const yutaiIdDOM = document.querySelector(".task-edit-id");
const yutaiNameDOM = document.querySelector(".task-edit-name");
const yutaiUsedDOM = document.querySelector(".task-edit-completed");
const yutaiExpiredDOM = document.querySelector(".task-edit-expired");
const editFormDOM = document.querySelector(".single-task-form");
const formAlertDOM = document.querySelector(".form-alert");

const showYutai = async () => {
    try {
        const { data: yutai} = await axios.get(`/api/v1/yutai/${id}`);
        const { _id, used, name, expireD } = yutai;
        const date = new Date(expireD);
        const formattedDate = date.toISOString().split('T')[0];
        yutaiIdDOM.textContent = _id;
        yutaiNameDOM.value = name;
        yutaiExpiredDOM.value = formattedDate;
        if (used) {
            yutaiUsedDOM.checked = true;
        }
    } catch (err) {
        console.log(err);
    }
};
showYutai();

editFormDOM.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const yutaiName = yutaiNameDOM.value;
        const yutaiExpireD = yutaiExpiredDOM.value;
        yutaiUsed = yutaiUsedDOM.checked;
        const { data: yutai } = await axios.patch(`/api/v1/yutai/${id}`,
             {name: yutaiName,
                expireD: yutaiExpireD,
                used: yutaiUsed
             });
        formAlertDOM.style.display = "block";
        formAlertDOM.textContent = "優待銘柄を更新しました";
        formAlertDOM.classList.add("text-success");
    } catch (err) {
        console.log(err);
    }
    setTimeout(() => {
        formAlertDOM.style.display = "none";
        formAlertDOM.classList.remove("text-success");
    }, 3000);
});