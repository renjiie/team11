import React, { useState } from 'react';
import {
	Form,
	Input,
	Button,
	message,
	List,
	Card,
	Avatar,
	Image,
	Modal,
} from 'antd';
import { individualTeams, player_names } from './configs';
import { getKeyByValue } from './utils';
import { getImageByKey } from './utils/fetchImage';
import partner from './assets/partner.gif';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const error = () => {
	message.error('Something went wrong! Please contact 9940616329');
};
const dataLoadederror = () => {
	message.error('Data already iruku da. Ipa unaku ena venum');
};
const errorGif = () => {
	message.error('You are not an admin');
};
const LoginForm = () => {
	const [form] = Form.useForm();
	const [userDetails, setUserDetails] = useState({
		phone: 0,
		otp: 0,
	});
	const [otpForm, setOtpForm] = useState(false);
	const [loading, setLoading] = useState(false);
	const [random, setRandom] = useState(false);
	const [teams, setTeams] = useState([]);
	const [falseLoading, setFalseLoading] = useState(false);

	const showConfirm = () => {
		confirm({
			title: 'Do you want to continue with the selections?',
			icon: <ExclamationCircleOutlined />,
			onOk() {
				const teamObj = {};
				teams.map((el, i) => (teamObj[`t${i}`] = el));
				setLoading(true);
				fetch(`https://team11-api.herokuapp.com/insertteams`, {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						team: teamObj,
					}),
					method: 'POST',
				})
					.then((response) => response.json())
					.then((results) => {
						if (results.status === 'success') {
							setLoading(false);
						} else {
							setLoading(false);
							dataLoadederror();
						}
					})
					.catch((err) => {
						error();
						setLoading(false);
					});
			},
			onCancel() {},
		});
	};
	const onFinish = (values) => {
		if (otpForm && values && values.otp.match(/^\d{6}$/)) {
			setLoading(true);
			const otpNumber = { otp: values.otp };
			setUserDetails({ ...userDetails, otp: values.otp });
			fetch(`https://team11-api.herokuapp.com/otp`, {
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
						setRandom(true);
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
			if (
				values.phone === '9840286159' ||
				values.phone === '8220892084' ||
				values.phone === '9940616329'
			) {
				const phoneNumber = { phone: values.phone };
				setUserDetails({ ...userDetails, phone: values.phone });
				fetch(`https://team11-api.herokuapp.com/phoneNumber`, {
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
			} else {
				setLoading(false);
				errorGif();
			}
		}
	};
	const handleTeamSelection = () => {
		setFalseLoading(true);
		setTimeout(() => {
			setFalseLoading(false);
		}, 5000);
		const individuals = [...individualTeams];
		individuals.sort(() => 0.5 - Math.random());
		const pairs = [];

		// as we need at least players to form a pair
		while (individuals.length >= 2) {
			const pair = [individuals.pop(), individuals.pop()];
			// Save current pair
			pairs.push(pair);
		}
		setTeams(pairs);
	};
	return random ? (
		<div className='team-selection-container'>
			<Modal
				className='gif-modal'
				visible={falseLoading}
				closable={false}
				mask
				footer={null}
				bodyStyle={{
					padding: '0px',
					width: '50%',
					height: '50vh',
				}}>
				<img className='partner-gif' src={partner} alt='SELETION...' />
			</Modal>
			<div className='team-selection-title'>Team Selection</div>
			<div className='selection-list'>
				<div className='total-squad'>
					<div className='total-squad-title'>All Players</div>
					<div className='individual-teams'>
						<List
							size='small'
							bordered
							dataSource={individualTeams}
							renderItem={(item) => (
								<List.Item>
									<List.Item.Meta
										avatar={
											<Avatar
												src={
													<Image
														src={getImageByKey(item)}
														preview={{
															src: getImageByKey(item),
														}}
													/>
												}
											/>
										}
										title={getKeyByValue(player_names, item)}
										description={item}
									/>
								</List.Item>
							)}
						/>
					</div>
					<Button type='primary' onClick={handleTeamSelection}>
						Select Teams
					</Button>
				</div>

				{teams.length > 0 && !falseLoading && (
					<div className='random-container'>
						<div className='random-squad-title'>Selected Teams</div>
						<div className='random-teams'>
							<List
								grid={{ gutter: 16, column: 1 }}
								dataSource={teams}
								renderItem={(item, index) => (
									<List.Item>
										<Card>
											<Avatar.Group>
												<Avatar
													src={
														<Image
															src={getImageByKey(item[0])}
															preview={{
																src: getImageByKey(item[0]),
															}}
														/>
													}
												/>
												<Avatar
													src={
														<Image
															src={getImageByKey(item[1])}
															preview={{
																src: getImageByKey(item[1]),
															}}
														/>
													}
												/>
											</Avatar.Group>
											<div className='team-cards'>
												{item[0]} & {item[1]}
											</div>
										</Card>
									</List.Item>
								)}
							/>
						</div>

						<Button type='primary' onClick={showConfirm}>
							Confirm Teams
						</Button>
					</div>
				)}
			</div>
		</div>
	) : (
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
