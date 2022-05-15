export const validName = new RegExp(
    // '^([a-zA-Z\']{2,}[ ]{0,3})+$'
    '^[A-Za-z\'àâäéèêëïîôöùûüç-]{2,50}$'
)

export const validEmail = new RegExp(
    '^([a-z0-9]+[-._]?[a-z0-9]+)+@([a-z0-9]+[_-]?){2,}\.[a-z]{2,4}$'
)

export const validPassword = new RegExp(
    '^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[-!?_])(?=.*?[0-9])[-a-zA-Z0-9!?_]{7,15}$'
)