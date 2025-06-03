import { useState } from "react";
import { Upload, Button, Image, Modal, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import * as fetchModel from "../../lib/fetchModelData";

const CLOUD_NAME = "dchjuyiwk"; 
const UPLOAD_PRESET = "TH3-photo"; 

const AddPhoto = ({ prop: user_id }) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const showModal = () => {
        setImageUrl(null);
        setImageFile(null);
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const beforeUpload = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setImageUrl(e.target.result);
        };
        reader.readAsDataURL(file);
        setImageFile(file);
        return false;
    };

    const handleSubmit = async () => {
        setLoading(true);

        try {
            // 1. Upload lên Cloudinary
            const formData = new FormData();
            formData.append("file", imageFile);
            formData.append("upload_preset", UPLOAD_PRESET);

            const res = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await res.json();
            if (!data.secure_url) throw new Error("Upload ảnh thất bại!");

            // 2. Gửi URL ảnh về backend
            const backendRes = await fetchModel.ApiPhotosOfUserAddPhoto(
                user_id,
                data.secure_url
            );
            if (backendRes.status === 200) {
                message.success("Thêm ảnh thành công!");
                setOpen(false);
            } else {
                message.error("Lưu ảnh thất bại!");
            }
        } catch (error) {
            console.error(error);
            message.error("Đã có lỗi xảy ra!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Add Photo
            </Button>
            <Modal
                open={open}
                title="Add Photo"
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Return
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        loading={loading}
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>,
                ]}
            >
                <Upload beforeUpload={beforeUpload} showUploadList={false}>
                    <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                </Upload>

                {imageUrl && (
                    <div style={{ marginTop: 16 }}>
                        <p>Ảnh đã chọn:</p>
                        <Image src={imageUrl} alt="Uploaded" width={200} />
                    </div>
                )}
            </Modal>
        </>
    );
};

export default AddPhoto;
