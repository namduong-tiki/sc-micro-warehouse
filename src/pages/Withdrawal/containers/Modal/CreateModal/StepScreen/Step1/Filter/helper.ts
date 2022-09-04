export const checkPlaceholderFilter = (type:string) =>{
    switch (type) {
        case 'name':
            
            return 'bpor.enter_name_product';
        case 'sku':
            return 'Nhập SKU sản phẩm'
        case 'code':
        return 'Nhập mã sản phẩm'    
        default:
             return 'bpor.enter_name_product'
    }
}
