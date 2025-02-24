
import { useEffect, useRef, useState } from 'react';
import './style.css'


import Peer from "peerjs"
import PropTypes from 'prop-types';
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import TextField from "@material-ui/core/TextField"
import AssignmentIcon from "@material-ui/icons/Assignment"
import PhoneIcon from "@material-ui/icons/Phone"

import { CopyToClipboard } from "react-copy-to-clipboard"
import { useSelector } from 'react-redux';

const ModalCall = ({ socket,receiveId,stateCall ,setReceivingCall,receivingCall}) => {
	const { user } = useSelector(state => state?.auth)

	

useEffect(()=>{
	
if(stateCall && idToCall && stream){callUser()}
	

},[stateCall,idToCall,stream])
	console.log(me)
	console.log(idToCall)
	console.log(stream)







console.log(receivingCall)
console.log(callAccepted)
	return (
		<div className='modalCall-wrapper'>
			<form className='z-20 rounded-lg  w-[80%] h-[70%] bg-white mx-auto mt-[50px] block'>
				<>
					<h1 style={{ textAlign: "center", color: '#fff' }}>Zoomish</h1>
					<div className="container">
						<div className="video-container">
							<div className="video">
								{stream && <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
							</div>
							<div className="video">
								{callAccepted && !callEnded ?
									<video playsInline ref={userVideo} autoPlay style={{ width: "300px" }} /> :
									null}
							</div>
						</div>
						<div className="myId">
							
							<div className="call-button">
								{callAccepted && !callEnded ? (
									<Button variant="contained" color="secondary" onClick={leaveCall}>
										End Call
									</Button>
								) : (
									<IconButton color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
										<PhoneIcon fontSize="large" />
									</IconButton>
								)}
								{idToCall}
							</div>
						</div>
						<div>
							{receivingCall && !callAccepted ? (
								<div className="caller">
									<h1 >aha is calling...</h1>
									<Button variant="contained" color="primary" onClick={answerCall}>
										Answer
									</Button>
								</div>
							) : null}
						</div>
					</div>
				</>
			</form>
		</div>
	)
}
ModalCall.propTypes = {
	socket: PropTypes.object.isRequired,
	receiveId: PropTypes.string.isRequired,
	
	receivingCall: PropTypes.bool.isRequired,
	setReceivingCall: PropTypes.func.isRequired,
	stateCall: PropTypes.bool.isRequired,
}
export default ModalCall