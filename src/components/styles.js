const bookofStyles = {
  eventWrapper: [
    'bg-gray-100',
    'p-4',
    'rounded',
    'shadow-md',
    'flex',
    'flex-col',
    'flex-row',
    'm-6',
    'mt-8',
    'w-700', 
    'h-400', 
  ],
  actionsWrapper: ['actions', 'flex', 'items-center', 'mt-4'],
  quantity: ['actions', 'flex', 'items-center', 'mt-4'],
  input: [
    'input',
    'w-16',
    'text-center',
    'border',
    'border-gray-300',
    'rounded',
    'py-2',
    'px-3',
    'text-gray-700',
    'focus:outline-none',
    'focus:shadow-outline',
  ],
  quantityActions: ['quantity-action', 'items-center', 'space-x-2', 'ml-6'],
  increaseBtn: [
    'increase',
    'px-3',
    'py-1', 
    'rounded',
    'bg-black',
    'text-white',
    'hover:bg-blue-900',
    'focus:outline-none',
    'focus:shadow-outline',
  ],
  decreaseBtn: [
    'decrease',
    'px-3',
    'py-1',
    'rounded',
    'bg-black',
    'text-white',
    'hover:bg-blue-900',
    'focus:outline-none',
    'focus:shadow-outline',
  ],
  addToCartBtn: [
    'add-to-cart-btn',
    'bg-blue-500',
    'text-white',
    'py-2',
    'px-4',
    'font-bold',
    'rounded',
    'hover:bg-black',
    'transition',
    'duration-300',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    'focus:outline-none',
    'focus:shadow-outline',
  ],
  purchase: [
  'bg-white',
  'px-4',
  'py-3',
  'gap-x-4',
  'sm:border-b',
  'sm:border-gray-200',
  'flex',
  'md:flex',
  'mx-auto',
  ],
  purchaseTitle: ['text-lg','text-center', 'font-medium', 'text-gray-900', 'flex-1'],
  purchaseQuantity: [
    'w-[50px]',
    'text-center',
    'py-1',
    'px-2',
    'border',
    'border-orange-700',
    'border-2',
    'disabled:border-0',
    'rounded',
    'text-orange-700',
    'text-sm',
    'leading-tight',
    'font-bold',
    'disabled:text-gray-700',
    'focus:outline-none',
    'focus:shadow-outline',
    'md:flex',
    'mx-auto',
  ],
  purchaseQuantityWrapper: ['flex', 'flex-row', 'flex-1', 'md:flex'],
  purchaseType: [
    'w-fit',
    'py-1',
    'px-2',
    'mr-8',
    'border',
    'border-2',
    'py-px',
    'disabled:border-transparent',
    'disabled:appearance-none',
    'disabled:text-gray-900',
    'disabled:border-2',
    'disabled:pl-3',
    'rounded',
    'leading-tight',
    'focus:outline-none',
    'focus:shadow-outline',
    'text-base',
  ],
  purchaseTypeWrapper: ['flex', 'flex-row', 'flex-1', 'md:flex'],
  
  purchaseDate: ['text-center','flex-1', 'md:flex'],
  purchasePrice: ['text-center', 'w-12', 'md:flex'],
  actions: ['sm:mt-0', 'sm:text-right', 'w-28'],
  actionButton: [
    'ml-2',
    'text-xl',
    'ps-2',
    'font-medium',
    'underline',
    'text-gray-700',
  ],
  deleteButton: ['hover:text-red-500'],
  cancelButton: ['hover:text-red-500'],
  saveButton: ['hover:text-green-500'],
  editButton: ['hover:text-blue-500'],
  hiddenButton: ['hidden'],

};



  
export function useStyle(type) {
    if (typeof type === 'string'){
        return bookofStyles[type];
    } else { 
        const allStyles = type.map((t) => bookofStyles[t]);
        return allStyles.flat();
    }
}