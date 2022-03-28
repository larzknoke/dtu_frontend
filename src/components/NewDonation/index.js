import React, { useState } from "react";
import { Button, Form, Input, Checkbox, Tooltip, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function NewDonation() {
	const [showNewForm, setShowNewForm] = useState(false);
	const [donationForm] = Form.useForm();

	const onFinish = () => {
		donationForm
			.validateFields()
			.then((values) => {
				setShowNewForm(false);
				donationForm.resetFields();
				console.log(values);
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
						message.success("This is a success message");
					});
			})
			.catch((info) => {
				console.log("Validate Failed:", info);
			});
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
				</Form>
			</Modal>
		</>
	);
}

export default NewDonation;
