export function authHeader(){
    let jwt = localStorage.getItem('jwt');
    let user = JSON.parse(localStorage.getItem('user'));
    if(jwt && user){
        return {'Authorization' : 'Bearer ' + jwt};
    }
    else {
        return {};
    }
}