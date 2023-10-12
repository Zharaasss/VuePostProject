export default {
    mounted(el, binding) {
            const options = {
                rootMargin: '0px',
                threshold: 1.0
            }
            const callBack = (entries, ) => {
                if(entries[0].isIntersecting) {
                    binding.value();
                    
                }
            };
            const observer = new IntersectionObserver(callBack, options);
            observer.observe(el);
    },
    name: 'intersection'
}