import {useState, useEffect} from 'react'
import axios from 'axios'
import Link from 'next/link';
import Image from 'next/image';
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

// import { getAllMessages } from "@/database";


const inter = Inter({ subsets: ['latin'] })


import { getAllChannels } from "@/database";

function wait(seconds) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, seconds * 1000)
    })
}

export default function Channels({channels,channelId, messages: initialMessages}) {

    // const [channels, setChannels] = useState([])

    // useEffect(() => {
    //     // Anything in useEffect will definitely run on the client
    //     // in the browser
    //     wait(5).then(() => axios.get("/api/channels")
    //     .then((response) => {
    //         setChannels(response.data)
    //     }))
    // }, [])
    // Get request to /api/channels
    // useState
    // useEffect

    const [userName, setUserName] = useState('')
    const [channelName, setChannelName] = useState('')
    const [text, setText] = useState('')
    const [messages, setMessages] = useState(initialMessages)

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('submit', userName, text)
        // Send to the database (POST)

        const result = await axios.post(`/api/channels/${channelId}/messages`, {
            userName, text
        })
        const newMessage = result.data

        setMessages([...messages, newMessage])
    }

    const handleSubmit2 = async (e) => {
        e.preventDefault()
        console.log('submit', channelName, text)
        // Send to the database (POST)

        const result = await axios.post(`/api/channels`, {
            channelName, text
        })
        const newMessage = result.data

        setChannelName([...messages, newMessage])
    }

    return (
        <>
        <main className={styles.main}>
  
        <div className={styles.nav}>Meowscord</div>
        <div className={styles.userCont}>
        <div className={styles.channelCont}>
            <div className={styles.cNameCont}>
            <h1>Channels</h1>
            </div>
            <div className={styles.listChan}>
            <ul>
                {channels.map((channel) => (
                    <Link href={`/channels/${channel.id}`}><li key={channel.id} className={styles.chanItem}>{channel.name}</li></Link>
                    ))}
            </ul>
            <form onSubmit={handleSubmit2}>
                <input type="text" value={channelName} onChange={(e) => setUserName(e.target.value)} />
                <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
                <button type="submit">Send</button>
            </form>
            </div>
        </div>
        <div className={styles.mesDiv}>
            <div className={styles.cMesCont}># {channelId}</div>
            {/* <ul>
                {messages.map((message) => (
                    <li key={message.id}>{message.text}</li>
                ))}
            </ul> */}
                {/* <input type="text" />
                <input type="text" />
                <button>Send</button> */}
            <form onSubmit={handleSubmit}>
                <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
                <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
                <button type="submit">Send</button>
            </form>
        </div>
        </div>

      </main>
      </>
    )
}

export async function getServerSideProps() {

    // runs on the server
    const channels = await getAllChannels();

    return {
        props: {
            channels: JSON.parse(JSON.stringify(channels)),

        }
    }

}
