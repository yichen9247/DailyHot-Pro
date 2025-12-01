import Swal from "sweetalert2";
import { createApp, h } from "vue";
import { DialogService } from "../DialogService";
import { loadVueLazyLoad } from "@/scripts/appScript";


/**
 * @name 弹窗服务实现类
 * @author yichen9247
 * @description 不能单例调用，部分组件会循环调用
 */
export class DialogServiceImpl implements DialogService {
    /**
     * @name 打开自定义Swal弹窗
     * @param content 弹窗内容
     * @param param1 参数列表
     */
    openCustomSwalDialog(content: any, {
        title = "", 
        props = {}, 
        width = 525, 
        autoWidth = false, 
        className = "app-swal-dialog"
    } = {}): void {
        const createVueWrapper = () => {
            const vueWrapper = document.createElement('div');
            const application = createApp({
                setup: () => () => h(content, props)
            });
            loadVueLazyLoad(application);
            application.mount(vueWrapper);
            return { vueWrapper, application };
        };
        const swalConfig = {
            html: null as HTMLElement | null,
            showConfirmButton: false, title,
            width: autoWidth ? "auto" : width,
            customClass: { container: className },
            willClose: null as (() => void) | null
        };
        const { vueWrapper, application } = createVueWrapper();
        swalConfig.html = vueWrapper;
        swalConfig.willClose = () => setTimeout(application.unmount, 800);
        Swal.fire(swalConfig);
    }
}