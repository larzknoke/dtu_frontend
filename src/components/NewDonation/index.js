import React, { useState } from "react";
import { useRouter } from "next/router";
import {
	InputNumber,
	Button,
	Form,
	Input,
	Checkbox,
	Tooltip,
	Modal,
	message,
	Row,
	Col,
	Typography,
	Select,
	Divider,
	Upload,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";

import { PlusOutlined } from "@ant-design/icons";

function NewDonation() {
	const router = useRouter();
	const [showNewForm, setShowNewForm] = useState(false);
	const [donationForm] = Form.useForm();
	const { Option } = Select;

	const normFile = (e) => {
		console.log("Upload event:", e);

		if (Array.isArray(e)) {
			return e;
		}

		return e && e.fileList;
	};

	const onFinish = () => {
		donationForm
			.validateFields()
			.then((values) => {
				console.log("values:", values);
				setShowNewForm(false);
				donationForm.resetFields();
				fetch("http://localhost:3000/donations.json", {
					method: "POST",
					body: JSON.stringify({ donation: values }),
					headers: {
						"Content-Type": "application/json",
					},
				})
					.then((response) => response.json())
					.then((data) => {
						console.log(data);
						message.success("Donation successful created.");
						router.push(`/donation/${data.id}`);
					});
			})
			.catch((info) => {
				console.log("Validate Failed:", info);
			});
	};

	const dummyRequest = ({ file, onSuccess }) => {
		setTimeout(() => {
			onSuccess("ok");
		}, 0);
	};

	return (
		<>
			<Tooltip title="Add new donation" placement="bottom">
				<PlusOutlined
					onClick={() => setShowNewForm(true)}
					style={{ fontSize: "16px" }}
				/>
			</Tooltip>
			<Modal
				className="new-donation-modal"
				title="New Donation"
				centered
				width={"100%"}
				visible={showNewForm}
				onOk={() => {}}
				onCancel={() => setShowNewForm(false)}
				footer={[
					<Button key="back" onClick={() => setShowNewForm(false)}>
						Cancel
					</Button>,
					<Button
						key="submit"
						htmlType="submit"
						type="primary"
						onClick={() => donationForm.submit()}
					>
						Add Donation
					</Button>,
				]}
			>
				<Form
					form={donationForm}
					onFinish={onFinish}
					typeof="vertical"
					name="basic"
					initialValues={
						{
							// remember: true,
						}
					}
					autoComplete="off"
				>
					<Form.Item
						label="Title"
						name="title"
						rules={[
							{
								required: true,
								message: "Please input a title.",
							},
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="Description"
						name="description"
						rules={[
							{
								required: true,
								message: "Please input a description.",
							},
						]}
					>
						<Input.TextArea />
					</Form.Item>
					<Divider />
					<Typography.Title type="secondary" level={5}>
						Contact Information
					</Typography.Title>
					<Form.Item label="Name" name="contact">
						<Input />
					</Form.Item>
					<Form.Item label="Street" name="street">
						<Input />
					</Form.Item>
					<Row gutter={24}>
						<Col span={8}>
							<Form.Item label="PLZ" name="plz">
								<InputNumber min={11111} max={99999} />
							</Form.Item>
						</Col>
						<Col span={16}>
							<Form.Item label="City" name="city">
								<Input />
							</Form.Item>
						</Col>
					</Row>
					<Divider />
					<Form.Item label="Category" name="category">
						<Select allowClear>
							<Option value="clothes">Clothes</Option>
							<Option value="electricity">Electricity</Option>
						</Select>
					</Form.Item>
					<Form.Item label="Images">
						<Form.Item
							name="images"
							valuePropName="fileList"
							getValueFromEvent={normFile}
							noStyle
						>
							<Upload.Dragger
								name="files"
								customRequest={dummyRequest}
							>
								<p className="ant-upload-drag-icon">
									<InboxOutlined />
								</p>
								<p className="ant-upload-text">
									Click or drag file to this area to upload
								</p>
								<p className="ant-upload-hint">
									Support for a single or bulk upload.
								</p>
							</Upload.Dragger>
						</Form.Item>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
}

export default NewDonation;
