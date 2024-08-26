import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import Peer from "peerjs";

const CreateRoomForm = ({ uuid, socket, setUser, setMyPeer }) => {
  const [roomId, setRoomId] = useState(uuid());
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleCreateRoom = (e) => {
    e.preventDefault();
    if (!name) return toast.dark("Please enter your name!");

    // {name,roomId, userId, host, presenter}

    // const myPeer = new Peer(undefined, {
    //   host: "/",
    //   port: 5001,
    //   path: "/",
    //   secure: false,
    // });

    // setMyPeer(myPeer);
    const roomData = {
      name,
      roomId,
      userId: uuid,
      host: true,
      presenter: true,
    };
    setUser(roomData);
    navigate(`/${roomId}`);
    console.log(roomData);
    socket.emit("userJoined", roomData);

    // myPeer.on("open", (id) => {
    // });
    // myPeer.on("error", (err) => {
    //   console.log("peer connection error", err);
    //   this.myPeer.reconnect();
    // });
  };

  return (
    <form className="form col-md-12 mt-5">
      <div className="form-group">
        <input
          type="text"
          className="form-control my-2 border-success"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group border border-success">
        <div className="input-group d-flex align-items-center jusitfy-content-center">
          <input
            type="text"
            value={roomId}
            className="form-control my-2 border-0 m-2"
            disabled
            placeholder="Generate room code"
          />
          <div className="input-group-append">
            <button
              className="btn btn-success btn-sm m-2 me-1"
              onClick={() => setRoomId(uuid())}
              type="button"
            >
              generate
            </button>
            <button
              className="btn btn-warning btn-sm me-2"
              type="button"
            >
              copy
            </button>
          </div>
        </div>
      </div>
      <button
        type="submit"
        onClick={handleCreateRoom}
        className="mt-4 btn-outline-success btn-block form-control"
      >
        Generate Room
      </button>
    </form>
  );
};

export default CreateRoomForm;
