import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
const error = () => {
	message.error('Something went wrong! Please reload the page and try again');
};
const LoginForm = ({ handleTeamResults }) => {
	const [form] = Form.useForm();
	const [userDetails, setUserDetails] = useState({
		phone: 0,
		otp: 0,
	});
	const [otpForm, setOtpForm] = useState(false);
	const [loading, setLoading] = useState(false);

	const onFinish = (values) => {
		if (otpForm && values && values.otp.match(/^\d{6}$/)) {
			setLoading(true);
			const otpNumber = { otp: values.otp };
			setUserDetails({ ...userDetails, otp: values.otp });
			fetch(`/api/otp`, {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(otpNumber),
				method: 'POST',
			})
				.then((response) => response.json())
				.then((results) => {
					if (results.status === 'success') {
						console.log('THE results', results);
						handleTeamResults({
							userDetails,
							teams: results.message,
						});
						setLoading(false);
					} else {
						setLoading(false);
						error();
					}
				})
				.catch((err) => {
					error();
					setLoading(false);
				});
		} else if (values && values.phone.match(/^\d{10}$/)) {
			setLoading(true);
			const phoneNumber = { phone: values.phone };
			setUserDetails({ ...userDetails, phone: values.phone });
			fetch(`/api/phoneNumber`, {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(phoneNumber),
				method: 'POST',
			})
				.then((response) => response.json())
				.then((results) => {
					if (results.status === 'success') {
						setLoading(false);
						setOtpForm(true);
					} else {
						error();
						setLoading(false);
					}
				})
				.catch((err) => {
					error();
					setLoading(false);
				});
			// userApi.phoneNumberApi({ phone: values.phone });
		}
	};

	return (
		<div className='login-page-main'>
			<div className='login-form-container'>
				<div className='login-title'>LOGIN</div>
				<div className='login-card'>
					<div className='login-card-content'>
						<Form
							form={form}
							name='login'
							onFinish={onFinish}
							scrollToFirstError>
							{otpForm ? (
								<Form.Item
									name='otp'
									label='OTP'
									rules={[
										{
											required: true,
											message: 'OTP enter panni thola!',
										},
									]}>
									<Input
										style={{
											width: '100%',
										}}
									/>
								</Form.Item>
							) : (
								<Form.Item
									name='phone'
									label='Mobile No'
									rules={[
										{
											required: true,
											message: 'Oru phone number kooda enter pana therilaye!',
										},
									]}>
									<Input
										addonBefore={<div>+91</div>}
										style={{
											width: '100%',
										}}
									/>
								</Form.Item>
							)}

							<Form.Item>
								<Button loading={loading} type='primary' htmlType='submit'>
									{otpForm ? 'VERIFY OTP' : 'PROCEED'}
								</Button>
							</Form.Item>
						</Form>
					</div>
				</div>
			</div>
			<div className='login-bg-img'></div>
		</div>
	);
};

export default LoginForm;
