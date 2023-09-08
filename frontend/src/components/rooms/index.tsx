"use client";

import React, { ChangeEvent } from "react";

import style from "./../../styles/chat.module.scss";
import Avatar from "react-avatar";
import { io, Socket } from "socket.io-client";

// import { API_URL } from "@/utils/endpoints";
import { useDispatch, useSelector } from "react-redux";
import { Theme } from "../ui";
import { MessageItemType } from "../../types/types";
import { API_URL, ROOM_URL } from "../../config/urls";
import { Button } from "@mui/material";
import { setRoom } from "../../store/reducers/roomReducer";
import { useNavigate } from "react-router-dom";
import { handleResponse } from "../../utils";
import { toast } from "react-toastify";

export const ChatRoom: React.FC = () => {
    // connect server

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [socket, setSocket] = React.useState<Socket | null>(null);
    const [text, setText] = React.useState<string>("");
    const [messages, setMessages] = React.useState<MessageItemType[]>([]);
    const [connectedUser, setConnectedUser] = React.useState<string[]>([]);

    const selectedRoom = useSelector((state: any) => state.persists.room.selectedRoom)
    const currentUser = useSelector((state: any) => state.persists.user.currentUser)

    React.useEffect(() => {
        const newSocket = io(API_URL);
        setSocket(newSocket);
    }, []);

    const onChnage = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    // Send text
    const handleSend = () => {
        const message: MessageItemType = {
            sender: currentUser.nickname,
            text: text,
        };
        socket?.emit("sendMessage", selectedRoom.id, message);
        setText("");
    };

    // Receive text
    socket?.on("sendMessage", (message: MessageItemType) => {
        setMessages([...messages, message]);
    });

    // Connected User
    socket?.on("connectedUser", (nickname: string) => {
        setConnectedUser([...connectedUser, nickname])
    });

    // Disconnected User
    socket?.on("disconnectedUser", (nickname: string) => {
        const connectedUserList = connectedUser.filter(user => user !== nickname)
        setConnectedUser(connectedUserList)
    });

    const handleLeave = () => {
        if (socket && selectedRoom) {
            socket.emit("leave", selectedRoom.id, currentUser.nickname);
            dispatch(setRoom({}))
            navigate("/");
        }
    }

    const handleDelete = async () => {
        const data = {
            owner: currentUser.id,
            room_id: selectedRoom.id
        }
        const requestOptions = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };

        await fetch(ROOM_URL, requestOptions)
            .then(handleResponse)
            .then((response) => {
                toast.success(
                    `Deleted the '${selectedRoom.room}' user successfully!`,
                );
                dispatch(setRoom({}))
                navigate("/");
                return;
            });   
    }

    return (
        <Theme>
            <div className={style["content"]}>
                <div className={style["chat-nav"]}>
                    {connectedUser &&
                        connectedUser.map((username, key) => (
                            <UserItem
                                key={key}
                                label={username}
                            />
                        ))}
                </div>
                <div className={style["chat-content"]}>
                    <div className={style["chat-head"]}>
                        <span>{selectedRoom.room}</span>
                        <div>
                            <Button
                                type="button"
                                variant="contained"
                                onClick={handleLeave}
                            >
                                Leave
                            </Button>
                            {
                                selectedRoom && selectedRoom.owner == currentUser.id && (
                                    <Button
                                        type="button"
                                        sx={{ ml: 3 }}
                                        variant="contained"
                                        onClick={handleDelete}
                                    >
                                        Delete
                                    </Button>
                                )
                            }
                            
                        </div>
                        
                    </div>
                    <div className={style["chat-body"]}>
                        {messages &&
                            messages.map((message, key) => (
                                <MessageItem
                                    key={key}
                                    item={message}
                                />
                            ))}
                    </div>
                    <div className={style["chat-footer"]}>
                        <input
                            className={style["message-input"]}
                            value={text}
                            onChange={onChnage}
                        />
                        <button
                            className={style["send"]}
                            onClick={handleSend}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </Theme>
    );
};

type Props = {
    label: string;
};

const UserItem: React.FC<Props> = (props) => {
    const { label } = props;
    return (
        <React.Fragment>
            <div className={style["user"]}>{label}</div>
        </React.Fragment>
    );
};

type MessageProps = {
    item: MessageItemType;
};
const MessageItem: React.FC<MessageProps> = (props) => {
    const { sender, text } = props.item;
    return (
        <React.Fragment>
            <div className={style["message-item"]}>
                <Avatar
                    name={sender}
                    size={"30px"}
                    round={true}
                />
                <div className={style["text"]}>{text}</div>
            </div>
        </React.Fragment>
    );
};
