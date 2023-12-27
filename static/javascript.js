function handleFileChange(event) {
    const table = document.getElementById("table");
    // let file = new File();

    // Lặp qua mảng dữ liệu để tạo các thẻ tr và td
    for (let i = 0; i < event.target.files.length; i++) {
        // Lấy file ảnh từ input image
        let file = event.target.files[i];

        // Sử dụng FileReader để đọc file ảnh
        let reader = new FileReader();
        let image = new Image();

        reader.onload = () => {
            // Khi file ảnh được đọc thành công
            // Hiển thị ảnh trên thẻ `img`
            // image = document.createElement("img");
            image.src = reader.result;
            image.height = 224;
            image.width = 224;
        };
    reader.readAsDataURL(file);

    let row = document.createElement("tr");

    // Thêm hình ảnh vào thẻ td đầu tiên
    let cell = document.createElement("td");
    cell.appendChild(image);
    cell.scope ="row"
    row.appendChild(cell);


    cell = document.createElement("td");
    cell.textContent = "Chưa xác định";
    cell.className = "label"
    row.appendChild(cell);

    table.appendChild(row);
    }
}



const URL = "https://teachablemachine.withgoogle.com/models/5w9FcsQeh/";

let model, maxPredictions;

// Load the image model and setup the webcam

async function init() {
    document.getElementById('btn-run').style.display = 'none';
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
    await predict();
    // document.getElementById('.btn--run').disabled = false;

}


// run the webcam image through the image model
async function predict() {
    // predict can take in an image, video or canvas html element
    const input = document.querySelector("#file-input");
    const label = document.querySelectorAll(".label");
    
    console.log("predict");
    console.log(input.files.length);
    for(let k=0; k < input.files.length; k++)
    {  
        let file = input.files[k];

        // Sử dụng FileReader để đọc file ảnh
        let reader = new FileReader();
        let image = new Image();

        reader.onload = () => {
            // Khi file ảnh được đọc thành công
            // Hiển thị ảnh trên thẻ `img`
            // image = document.createElement("img");
            image.src = reader.result;
            image.height = 224;
            image.width = 224;
        };
        reader.readAsDataURL(file);
        // let body = document.body;
        // body.appendChild(image);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
    
        const newWidth = 224; // Kích thước mới (chiều rộng)
        const newHeight = 224; // Kích thước mới (chiều cao)
    
        canvas.width = newWidth;
        canvas.height = newHeight;
    
        ctx.drawImage(image, 0, 0, newWidth, newHeight);
        // webcam.canvas = canvas;
        const prediction = await model.predict(webcam.canvas, true);
        let max_v = 0, max_idx = -1;
        for (let i = 0; i < maxPredictions; i++) {
            if(prediction[i].probability.toFixed(2) > max_v)
            {
                max_v = prediction[i].probability.toFixed(2);
                max_idx = i;
            }
        }
        label[k].innerHTML = prediction[max_idx].className;
        console.log(prediction)
    }
}


// Lắng nghe sự kiện "change" của input image
document.querySelector("#file-input").addEventListener("change", handleFileChange);
