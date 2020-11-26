const base64 = require('base64url');

function get_jwt_claims(req){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const jwtParts = token.split('.');
    const payloadInBase64UrlFormat = jwtParts[1];
    const decodedPayload = base64.decode(payloadInBase64UrlFormat);
    return JSON.parse(decodedPayload)
}
exports.get_jwt_claims = get_jwt_claims
