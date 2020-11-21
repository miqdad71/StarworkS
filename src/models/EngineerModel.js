const dbConnect = require('../../config/db.config')

module.exports = {
  createEngineer: (acId) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO engineer
                SET ?
      `

      dbConnect.query(query, { ac_id: acId }, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },

  getAllEngineer: (paginate) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT en.en_id,
               ac.ac_id,
               ac.ac_name,
               en.en_job_title,
               en.en_job_type,
               en.en_domicile
          FROM engineer en
          JOIN account ac
            ON (ac.ac_id = en.ac_id)
         LIMIT ${paginate.limit}
        OFFSET ${paginate.offset}
      `

      dbConnect.query(query, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },

  getSearchEngineer: (paginate) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT en.en_id,
               ac.ac_id,
               ac.ac_name,
               en.en_job_title,
               en.en_job_type,
               en.en_domicile
          FROM engineer en
          JOIN account ac 
            ON (ac.ac_id = en.ac_id)
          JOIN skill sk 
            ON (sk.en_id = en.en_id)
         WHERE ac.ac_name
          LIKE '%${paginate.search}%'
            OR sk.sk_skill_name
          LIKE '%${paginate.search}%'
      GROUP BY ac.ac_id
         LIMIT ${paginate.limit} 
        OFFSET ${paginate.offset}
      `

      dbConnect.query(query, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },

  getEngineerById: (enId) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT en.en_id,
               ac.ac_id,
               ac.ac_name,
               en.en_job_title,
               en.en_job_type,
               en.en_domicile
          FROM engineer en
          JOIN account ac
            ON ac.ac_id = en.ac_id
         WHERE ?
      `

      dbConnect.query(query, { en_id: enId }, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },

  getFilterEngineer: (paginate) => {
    return new Promise((resolve, reject) => {
      const filter = parseInt(paginate.filter)
      let query

      if (filter === 0) {
        query = `
          SELECT en.en_id,
               ac.ac_id,
               ac.ac_name,
               en.en_job_title,
               en.en_job_type,
               en.en_domicile
            FROM engineer en
            JOIN account ac
              ON ac.ac_id = en.ac_id
            JOIN skill sk
              ON sk.en_id = en.en_id
        GROUP BY ac.ac_id
        ORDER BY ac.ac_name ASC
           LIMIT ${paginate.limit} 
          OFFSET ${paginate.offset}
        `
      } else if (filter === 1) {
        query = `
          SELECT en.en_id,
                 ac.ac_id,
                 ac.ac_name,
                 en.en_job_title,
                 en.en_job_type,
                 en.en_domicile
            FROM engineer en
            JOIN account ac
              ON ac.ac_id = en.ac_id
            JOIN skill sk
              ON sk.en_id = en.en_id
        GROUP BY ac.ac_id
        ORDER BY sk.sk_skill_name ASC
           LIMIT ${paginate.limit} 
          OFFSET ${paginate.offset}
        `
      } else if (filter === 2) {
        query = `
          SELECT en.en_id,
                ac.ac_id,
                ac.ac_name,
                en.en_job_title,
                en.en_job_type,
                en.en_domicile
            FROM engineer en
            JOIN account ac
              ON ac.ac_id = en.ac_id
            JOIN skill sk
              ON sk.en_id = en.en_id
        GROUP BY ac.ac_id
        ORDER BY en.en_domicile ASC
           LIMIT ${paginate.limit} 
          OFFSET ${paginate.offset}
        `
      } else if (filter === 3) {
        query = `
          SELECT en.en_id,
                 ac.ac_id,
                 ac.ac_name,
                 en.en_job_title,
                 en.en_job_type,
                 en.en_domicile
            FROM engineer en
            JOIN account ac
              ON ac.ac_id = en.ac_id
            JOIN skill sk
              ON sk.en_id = en.en_id
           WHERE en.en_job_type = 'freelance'
        GROUP BY ac.ac_id
        ORDER BY en.en_job_type ASC
           LIMIT ${paginate.limit} 
          OFFSET ${paginate.offset}
        `
      } else {
        query = `
          SELECT en.en_id,
                 ac.ac_id,
                 ac.ac_name,
                 en.en_job_title,
                 en.en_job_type,
                 en.en_domicile
            FROM engineer en
            JOIN account ac
              ON ac.ac_id = en.ac_id
            JOIN skill sk
              ON sk.en_id = en.en_id
           WHERE en.en_job_type = 'full time'
        GROUP BY ac.ac_id
        ORDER BY en.en_job_type ASC
           LIMIT ${paginate.limit} 
          OFFSET ${paginate.offset}
        `
      }

      dbConnect.query(query, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },

  updateEngineer: (enId, data) => {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE engineer
           SET ?
         WHERE en_id = ${enId}
      `

      dbConnect.query(query, data, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }
}
