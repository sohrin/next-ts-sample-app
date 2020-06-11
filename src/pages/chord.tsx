// MEMO: window is not defined対策のためSSRを切って公開
import dynamic from 'next/dynamic';
export default dynamic(import("../component/ChordComponent"), {ssr:false})