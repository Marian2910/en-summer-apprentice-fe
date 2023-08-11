
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
    'width-700',
    'height-400'
  ],
  actionsWrapper: ['actions','flex', 'items-center', 'mt-4'],
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
  quantityActions: ['quantity-action','items-center', 'space-x-2', 'ml-6'],
  increaseBtn: [
    'increase',
    'px-3',
    'ру-1',
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
    'ру-1',
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
    'focus:otline-none',
    'focus:shadow-outline'
  ],
  };
  
export function useStyle(type) {
    if (typeof type === 'string'){
        return bookofStyles[type];
    } else { 
        const allStyles = type.map((t) => bookofStyles[t]);
        return allStyles.flat();
    }
}