
const bookofStyles = {
  eventWrapper: [
    'bg-gray-100',
    'p-4',
    'rounded-lg',
    'shadow-md',
    'mb-4',
  ],
  actionsWrapper: ['flex', 'items-center', 'space-x-4'],
  quantity: ['flex', 'items-center'],
  input: [
    'w-16',
    'py-1',
    'px-2',
    'border',
    'border-gray-300',
    'rounded',
    'text-center',
  ],
  quantityActions: ['flex', 'items-center', 'space-x-2'],
  increaseBtn: [
    'w-6',
    'h-6',
    'bg-green-500',
    'text-white',
    'rounded-full',
    'flex',
    'items-center',
    'justify-center',
    'text-sm',
  ],
  decreaseBtn: [
    'w-6',
    'h-6',
    'bg-red-500',
    'text-white',
    'rounded-full',
    'flex',
    'items-center',
    'justify-center',
    'text-sm',
  ],
  addToCartBtn: [
    'bg-blue-500',
    'text-white',
    'py-2',
    'px-4',
    'rounded',
    'hover:bg-blue-600',
    'transition',
    'duration-300',
    'ease-in-out',
    'disabled:opacity-50',
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