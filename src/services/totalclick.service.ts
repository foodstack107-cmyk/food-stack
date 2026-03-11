import TotalClickModel from '@/models/totalclick.model';

interface TopClickItem {
  name: string;
  clicks: number;
}

interface TopClickResponse {
  doordash?: TopClickItem[];
  ubereats?: TopClickItem[];
  shivshakti?: TopClickItem[];
  combined?: TopClickItem[];
}

export const TotalClick = async (
  button?: string,
): Promise<TopClickResponse> => {
  try {
    // Connect to MongoDB

    const validButtons = ['doordash', 'ubereats', 'shivshakti', 'combined'];
    const selectedButton = button?.toLowerCase();

    if (selectedButton && !validButtons.includes(selectedButton)) {
      throw new Error('Invalid button parameter');
    }

    // Map shivshakti to add-to-cart for database query
    const buttonTypeMap: { [key: string]: string } = {
      shivshakti: 'add-to-cart',
      doordash: 'doordash',
      ubereats: 'uber-eats',
    };

    let response: TopClickResponse = {};

    // If no button specified, fetch all categories
    if (!selectedButton) {
      // Aggregate clicks by buttonType and itemName
      const aggregation = await TotalClickModel.aggregate([
        {
          $group: {
            _id: { buttonType: '$buttonType', itemName: '$itemName' },
            clicks: { $sum: 1 },
          },
        },
        {
          $sort: { clicks: -1 },
        },
        {
          $group: {
            _id: '$_id.buttonType',
            items: {
              $push: {
                name: '$_id.itemName',
                clicks: '$clicks',
              },
            },
          },
        },
        {
          $project: {
            items: { $slice: ['$items', 5] },
          },
        },
      ]);

      // Aggregate combined clicks
      const combinedAggregation = await TotalClickModel.aggregate([
        {
          $group: {
            _id: '$itemName',
            clicks: { $sum: 1 },
          },
        },
        {
          $sort: { clicks: -1 },
        },
        {
          $limit: 5,
        },
        {
          $project: {
            name: '$_id',
            clicks: 1,
            _id: 0,
          },
        },
      ]);

      // Initialize response
      response = {
        doordash: [],
        ubereats: [],
        shivshakti: [],
        combined: combinedAggregation,
      };

      // Populate categories
      aggregation.forEach((group) => {
        if (group._id === 'doordash') {
          response.doordash = group.items;
        } else if (group._id === 'uber-eats') {
          response.ubereats = group.items;
        } else if (group._id === 'add-to-cart') {
          response.shivshakti = group.items;
        }
      });

      return response;
    }

    // Handle specific button category
    if (selectedButton === 'combined') {
      const combinedAggregation = await TotalClickModel.aggregate([
        {
          $group: {
            _id: '$itemName',
            clicks: { $sum: 1 },
          },
        },
        {
          $sort: { clicks: -1 },
        },
        {
          $limit: 5,
        },
        {
          $project: {
            name: '$_id',
            clicks: 1,
            _id: 0,
          },
        },
      ]);

      return { combined: combinedAggregation };
    }

    // Handle doordash, ubereats, or shivshakti
    const buttonType = buttonTypeMap[selectedButton];
    const aggregation = await TotalClickModel.aggregate([
      {
        $match: { buttonType },
      },
      {
        $group: {
          _id: '$itemName',
          clicks: { $sum: 1 },
        },
      },
      {
        $sort: { clicks: -1 },
      },
      {
        $limit: 5,
      },
      {
        $project: {
          name: '$_id',
          clicks: 1,
          _id: 0,
        },
      },
    ]);

    return { [selectedButton]: aggregation };
  } catch (error) {
    console.error('Error fetching top clicks:', error);
    throw new Error('Failed to fetch top clicks');
  }
};
