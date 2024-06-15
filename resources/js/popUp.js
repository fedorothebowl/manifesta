export default function(){
    return{
        showIstruzioni : false,
        showCredits : false,


        init(){
            if(!this.getLocalStorage()){
                this.showIstruzioni = true; 
                this.setLocalStorage();
            }
        },

        setLocalStorage(){
            localStorage.setItem('showIstruzioni', true);
        },

        getLocalStorage(){
            return localStorage.getItem('showIstruzioni');
        }
        
    }
}