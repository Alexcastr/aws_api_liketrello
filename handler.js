const { v4: uuidv4 } = require('uuid');

const AWS = require('aws-sdk');
const DynamoDB = new AWS.DynamoDB.DocumentClient();

const hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello World' })
  };
};

const addEntry = async (event) => {
  const timestamp = new Date().getTime();

  const _id = uuidv4();
  const { description, status } = JSON.parse(event.body);

  const params = {
    TableName: 'Entries',
    Item: {
      _id: _id,
      description,
      createdAt: timestamp,
      status
    }
  };

  try {
    await DynamoDB.put(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Entry created successfully' })
    };
  } catch (error) {
    console.log('error', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not create entry' })
    };
  }
};

const getEntries = async (event) => {
  const params = {
    TableName: 'Entries'
  };

  try {
    const data = await DynamoDB.scan(params).promise();

    if (data.Items.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'No entries found' })
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(data.Items)
    };
  } catch (error) {
    console.log('error', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not fetch entries' })
    };
  }
};

const getEntry = async (event) => {
  const { id } = event.pathParameters;

  const params = {
    TableName: 'Entries',
    Key: {
      _id: id
    }
  };

  try {
    const data = await DynamoDB.get(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(data.Item)
    };
  } catch (error) {
    console.log('error', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not fetch entry' })
    };
  }
};

const updateEntry = async (event) => {
  const { id } = event.pathParameters;
  const { description, status } = JSON.parse(event.body);

  const params = {
    TableName: 'Entries',
    Key: {
      _id: id
    },
    UpdateExpression: 'set #desc = :description, #stat = :status',
    ExpressionAttributeNames: {
      '#desc': 'description',
      '#stat': 'status'
    },
    ExpressionAttributeValues: {
      ':description': description,
      ':status': status
    },
    ReturnValues: 'UPDATED_NEW'
  };

  try {
    const data = await DynamoDB.update(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(data.Attributes)
    };
  } catch (error) {
    console.log('error', error);
    return {
      statusCode: 500,

      body: JSON.stringify({ error: 'Could not update entry' })
    };
  }
};

const deleteEntry = async (event) => {
  const { id } = event.pathParameters;

  const params = {
    TableName: 'Entries',
    Key: {
      _id: id
    }
  };

  try {
    await DynamoDB.delete(params).promise();
    return {
      statusCode: 200,

      body: JSON.stringify({ message: 'Entry deleted successfully' })
    };
  } catch (error) {
    console.log('error', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not delete entry' })
    };
  }
};

module.exports = {
  hello,
  getEntry,
  getEntries,
  addEntry,
  updateEntry,
  deleteEntry
};
