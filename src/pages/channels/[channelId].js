import { getAllMessages, getAllChannels } from "@/database";
import {useState, useEffect} from 'react'
import axios from 'axios'
import Link from 'next/link';
import Image from 'next/image';
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

export default function Channel({channelId, messages: initialMessages, channels}) {

    const [userName, setUserName] = useState('')
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

    useEffect(()=>{
        setMessages(initialMessages)
    },[initialMessages])

    return (
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
            </div>
        </div>
        <div className={styles.mesDiv}>
            <div className={styles.cMesCont}># {channelId}</div>
            <ul>
                {messages.map((message) => (
                    <li key={message.id}>{message.text}</li>
                ))}
            </ul>
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
    )
}

export async function getServerSideProps(context) {
    // This is always server side
    // From the server, we can connect to the database
    const channelId = context.query.channelId
    const messages = await getAllMessages(channelId)
    const channels = await getAllChannels();
    return {
        props: {
            channelId,
            messages: JSON.parse(JSON.stringify(messages)),
            channels: JSON.parse(JSON.stringify(channels)),
        }
    }
}
