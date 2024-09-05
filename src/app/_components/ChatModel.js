export const ChatModel = (name , message , direction) => {
    const node = document.createElement('p');
    node.innerHTML = `<span class="text-gray-400 dark:text-gray-600">${name} : </span>${message}`;
    node.classList.add(`text-${direction}` , `${direction === "center" ? "self-center" : direction === "right" ? "self-end" : "start"}` , "py-2" , "px-4" , "rounded-lg" , "max-w-[80%]" , "w-fit" , "dark:bg-slate-950" , "bg-gray-400/20" , "whitespace-pre-wrap" , "overflow-break", "font-semibold");
    
    return (
      node
    )
}