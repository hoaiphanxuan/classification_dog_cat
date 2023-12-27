# Classify Dog & Cat images

## Solution:
- Sử dụng `Teachable Machine` để huấn luyện mô hình phân loại chó và mèo với tập dữ liệu được lấy từ [kaggle](https://www.kaggle.com/datasets/tongpython/cat-and-dog)
- Xây dựng web phân loại ảnh mèo và chó:
    - Sử dụng Flask để xây dựng web
    - Sử dụng Keras để load model và dự đoán

## Remaining problem
- Trang web còn sơ sài và chưa được đẹp mắt, chưa xóa dữ liệu input
    > Khắc phục: Nếu có nhiều thời gian hơn có thể khắc phục được việc này
- Ảnh đầu vào dù không có chó hoặc mèo, mô hình vẫn được ra dự đoán một trong hai.
    > Khắc phục: đào tạo lại với dữ liệu có thêm ảnh không có cả hai con và thêm lớp không có chó và mèo.

## Environment
Python=3.7.10

Cài đặt môi trường
```
conda create -n environment-name python=3.7.10
```

Khởi chạy môi trường
```
conda activate environment-name
```

Cài đặt các thư viện cầu thiết:

``` 
pip install -r  requirements.txt
 ```

## How to run
1. Mở command line và chạy:

    ```python app.py```

2. Chọn các ảnh cần phân lớp
3. Nhấp vào nút "Run"
4. Nhấp vào nút "Reset" để quay lại

