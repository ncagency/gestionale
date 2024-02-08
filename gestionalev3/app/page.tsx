import Image from "next/image";
import styles from "./page.module.css";
import {AddForm} from '@/components'

export default function Home() {
  return (
    <main className={styles.main}>
        <div className="d-flex">
            <AddForm />
        </div>
    </main>
  );
}
