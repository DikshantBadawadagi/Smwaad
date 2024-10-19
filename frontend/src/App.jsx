import { useEffect } from 'react'
import ChatPage from './components/ChatPage'
import EditProfile from './components/EditProfile'
import Home from './components/Home'
import Login from './components/Login'
import MainLayout from './components/MainLayout'
import Profile from './components/Profile'
import Signup from './components/Signup'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { io } from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux'
import { setSocket } from './redux/socketSlice'
import { setOnlineUsers } from './redux/chatSlice'
import { setLikeNotification } from './redux/rtnSlice'
import ProtectedRoutes from './components/ProtectedRoutes'
import TextSign from './components/TextSign'
import Landingpage from './components/SecondPg'
import SignText from './components/SignText'
import Whiteboard from './components/Whiteboard'
import Interview from './components/Interview'
import Learning from './components/Learning-module'
import SocketClient from './components/socketClient'
// const browserRouter = createBrowserRouter([
//   {
//     path: "/",
//     element:<ProtectedRoutes><Landingpage /></ProtectedRoutes>,
//     children: [

//   {
//     path: "/community",
//     element: <ProtectedRoutes><MainLayout /></ProtectedRoutes>,
//     children: [
//       {
//         path: '/',
//         element: <ProtectedRoutes><Home /></ProtectedRoutes>
//       },
//       {
//         path: '/profile/:id',
//         element: <ProtectedRoutes> <Profile /></ProtectedRoutes>
//       },
//       {
//         path: '/account/edit',
//         element: <ProtectedRoutes><EditProfile /></ProtectedRoutes>
//       },
//       {
//         path: '/chat',
//         element: <ProtectedRoutes><ChatPage /></ProtectedRoutes>
//       },
//       {
//         path: '/text-to-sign',
//         element: <ProtectedRoutes><TextSign /></ProtectedRoutes>
//       }
//     ]
//   }]},
//   {
//     path: '/login',
//     element: <Login />
//   },
//   {
//     path: '/signup',
//     element: <Signup />
//   },
// ])
const browserRouter = createBrowserRouter([
  {
    path: "/", // Root route
    element: <ProtectedRoutes><Landingpage /></ProtectedRoutes>,
  },
  {
    path: "/community", // Community route
    element: <ProtectedRoutes><MainLayout /></ProtectedRoutes>,
    children: [
      {
        path: "", // Refers to "/community"
        element: <ProtectedRoutes><Home /></ProtectedRoutes>,
      },
      {
        path: "profile/:id", // Refers to "/community/profile/:id"
        element: <ProtectedRoutes><Profile /></ProtectedRoutes>,
      },
      {
        path: "account/edit", // Refers to "/community/account/edit"
        element: <ProtectedRoutes><EditProfile /></ProtectedRoutes>,
      },
      {
        path: "chat", // Refers to "/community/chat"
        element: <ProtectedRoutes><ChatPage /></ProtectedRoutes>,
      },
      {
        path: "text-to-sign", // Refers to "/community/text-to-sign"
        element: <ProtectedRoutes><TextSign /></ProtectedRoutes>,
      },
      {
        path: "sign-to-text", // Refers to "/community/text-to-sign"
        element: <ProtectedRoutes><SignText /></ProtectedRoutes>,
      },
      {
        path: "whiteboard", // Refers to "/community/text-to-sign"
        element: <ProtectedRoutes><Whiteboard /></ProtectedRoutes>,
      },
      {
        path: "interview", // Refers to "/community/text-to-sign"
        element: <ProtectedRoutes><Interview /></ProtectedRoutes>,
      },
      {
        path: "learning-module", // Refers to "/community/text-to-sign"
        element: <ProtectedRoutes><Learning /></ProtectedRoutes>,
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
]);



function App() {
  const { user } = useSelector(store => store.auth);
  const { socket } = useSelector(store => store.socketio);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const socketio = io('http://localhost:8000', {
        query: {
          userId: user?._id
        },
        transports: ['websocket']
      });
      dispatch(setSocket(socketio));

      // listen all the events
      socketio.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      socketio.on('notification', (notification) => {
        dispatch(setLikeNotification(notification));
      });

      return () => {
        socketio.close();
        dispatch(setSocket(null));
      }
    } else if (socket) {
      socket.close();
      dispatch(setSocket(null));
    }
  }, [user, dispatch]);

  return (
    <>
      <RouterProvider router={browserRouter} />
      <SocketClient />
    </>
  )
}

export default App
