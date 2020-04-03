import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

toast.configure()

function alertInfo(msg) {
    toast.info(msg)
}

function alertWarning(msg) {
    toast.warn(msg)
}

function alertSuccess(msg) {
    toast.success(msg)
}

function alertDanger(msg) {
    toast.error(msg)
}

export default {
    alertInfo,
    alertWarning,
    alertSuccess,
    alertDanger
}